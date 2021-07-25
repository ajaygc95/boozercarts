from django.contrib import admin
from .models import Todo, Item, OrderItem, Order

class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed')

# Register your models here.

admin.site.register(Todo, TodoAdmin)
admin.site.register(Item)
admin.site.register(OrderItem)
admin.site.register(Order)