from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, permissions, authentication
from django.views.generic import ListView, DetailView, View
from django.utils import timezone
from rest_framework.permissions import AllowAny
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .serializers import TodoSerializer, ItemSerializer, OrderSerializers, OrderItemSerializers
from .models import Todo, OrderItem, Order, Item
from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
# from stripe import *
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
import stripe


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def post(self, request, *args, **kwargs):
        cover = request.data['cover']
        title = request.data['title']

        Todo.objects.create(title=title, cover=cover)
        return HttpResponse({'message': "created"}, status=200)


class ItemVenderView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_queryset(self, *args,**kwargs):
        queryset = Item.objects.filter(vendor=self.request.query_params['vendor_pk'])
        return queryset


class ItemView(viewsets.ModelViewSet):

    permission_classes = [permissions.AllowAny]
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def create(self, request, *args, **kwargs):
        vendor = Todo.objects.get(id = request.data['vendor_pk'])
        price = request.data['price']
        title = request.data['title']
        category = request.data['category']
        quantity = request.data['quantity']
        picture = request.data['picture']
        
        Item.objects.create(
            vendor = vendor,
            title=title,
            price=price,
            category=category,
            quantity=quantity,
            picture=picture
        
        )
        return HttpResponse({'message': "created"}, status=200)


@login_required
def add_to_cart(request, *args, **kwargs):
    slug = request.data.get('slug', None)
    if slug is None:
        return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
    item = get_object_or_404(Item, slug=slug)
    order_item, created = OrderItem.objects.get_or_create(
        item=item,
        user=request.user,
        ordered=False
    )
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        # check if the order item is in the order
        if order.items.filter(item__slug=item.slug).exists():
            order_item.quantity += 1
            order_item.save()
            return Response(status=HTTP_200_OK)

        else:
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)

    else:
        ordered_date = timezone.now()
        order = Order.objects.create(
            user=request.user, ordered_date=ordered_date)
        order.items.add(order_item)
        return Response(status=HTTP_200_OK)


class AddToCartView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = OrderSerializers
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        print("this should be slug", slug)
        print("This is user +====", request.data)
        if slug is None:
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, slug=slug)
        order_item, created = OrderItem.objects.get_or_create(
            item=item,
            user=request.user,
            ordered=False
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                order_item.quantity += 1
                order_item.save()
                return Response(status=HTTP_200_OK)

            else:
                order.items.add(order_item)
                return Response(status=HTTP_200_OK)

        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                user=request.user, ordered_date=ordered_date)
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)

class OrderQuantityUpdateView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    serializer_class = OrderSerializers
    queryset = Order.objects.all()

    def create(self, request, *args, **kwargs):
        slug = request.data.get('slug', None)
        print("===========",slug)
        if slug is None:
            return Response({"message": "Item is incorrect"}, status=HTTP_400_BAD_REQUEST)

        item = get_object_or_404(Item, slug=slug)
        order_item, created = OrderItem.objects.get_or_create(
            item=item,
            user=request.user,
            ordered=False
        )
        order_qs = Order.objects.filter(user=request.user, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)
                return Response(status=HTTP_200_OK)
            else:
                return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class OrderItemDeleteView(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.TokenAuthentication]
    queryset = OrderItem.objects.all()

def home(request):
    return HttpResponse('<h1>Hello world<h1>')
