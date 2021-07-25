from django.db import models
from django.contrib.auth.models import User
# Create your models here.

def upload_path(instance, filename):
    return '/'.join(['vendor-covers', str(instance.title), filename])


class Vendor(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    address = models.CharField(max_length=120)
    rating = models.FloatField()
    total_rating = models.IntegerField()
    cover = models.ImageField(blank=True, null=True, upload_to=upload_path)
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.OneToOneField(User, related_name='vendor', on_delete=models.CASCADE)
    test = models.CharField(max_length=120)

    class Meta:
        ordering = ['name']

# class Category(models.Model):
#     title = models.CharField(max_length=255)
#     slug = models.SlugField(max_length=255)
#     ordering = models.IntegerField(default=0)
#
#     class Meta:
#         ordering = ['ordering']
#
#     def __str__(self):
#         return self.title
#
#     def _str_(self):
#         return self.title
