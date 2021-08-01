__author__ = "Ajay GC"

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'get-store', views.ItemVenderView, 'get-store')
router.register(r'item', views.ItemView, 'items')
router.register(r'cart', views.AddToCartView, 'cart')
router.register(r'payments', views.AddToCartView, 'payments')
router.register(r'delete-item', views.OrderItemDeleteView, 'delete-item')
router.register(r'order-item', views.OrderQuantityUpdateView, 'order-item')


urlpatterns = [
    
    path('todo/', include(router.urls)),
    path('', include(router.urls)),
    path('', views.home),
    # path('delete-item/<pk>/', views.OrderItemDeleteView, name="delete-item")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)