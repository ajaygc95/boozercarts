from django.db import models

from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.utils.text import slugify

def upload_path(instance, filename):
    return '/'.join(['covers', str(instance.title), filename])

class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    cover = models.ImageField(blank=True, null=True, upload_to=upload_path)

    def __str__(self):
        return self.title


CATEGORY_CHOICES = [
    ("Alcohol", "Alcohol"),
    ("Food", "Food"),
    ("Snacks", "Snacks"),
]

class Item(models.Model):
    vendor = models.ForeignKey(Todo, related_name='vendor', on_delete=models.CASCADE)
    slug = models.SlugField(default=None, null=True)
    title = models.CharField(max_length=100)
    price = models.FloatField()
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=50)
    quantity = models.FloatField()
    picture = models.ImageField(blank=True, null=True, upload_to=upload_path)
    owner = models.ForeignKey(User, related_name='store_owner', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Item, self).save(*args, **kwargs)

class OrderItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE, default=None)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    # def get_discount_item_price(self):
    #     return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price()

    def get_final_price(self):
        # if self.item.discount_price:
        #     return self.get_discount_item_price()
        return self.get_total_item_price()

    def get_total_items(self):
        return self.quantity

    # def __str__(self):
    #     return
    #
    # def __str__(self):
    #     return f"{self.quantity} of {self.item.title}"
    #
    # def get_total_item_price(self):
    #     return self.quantity * self.item.price


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderItem)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField()
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

    def get_total_price(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        return total

    def get_final_price(self):
        total = 0
        return self.get_total_price() + self.get_total_price()*0.09 + 3.99

    def get_total_items(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_items()
        return total