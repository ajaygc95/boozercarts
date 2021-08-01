__author__ = "Ajay GC"

from rest_framework import serializers
from .models import Todo, Item, OrderItem, Order



class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, data):
        return data

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed', 'cover')


class ItemSerializer(serializers.ModelSerializer):
    vendor = TodoSerializer(read_only=True)

    class Meta:
        model = Item
        fields = ('id', "slug", "title", "price", "category", "quantity", "picture", "vendor")


class OrderItemSerializers(serializers.ModelSerializer):
    item = StringSerializer()
    item_obj = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ('id','item','quantity',"item_obj", 'final_price')

    def get_item_obj(self, obj):
        return ItemSerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()

class OrderSerializers(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    total_price = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    taxes = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = ("id","items", 'total_price','final_price', 'taxes','total_items')

    def get_items(self,obj):
        return OrderItemSerializers(obj.items.all(), many=True).data

    def get_total_price(self,obj):
        return round(obj.get_total_price(), 2)

    def get_final_price(self,obj):
        return round(obj.get_final_price(), 2)

    def get_taxes(self,obj):
        return round((obj.get_total_price()*0.09), 2)

    def get_total_items(self, obj):
        return obj.get_total_items()