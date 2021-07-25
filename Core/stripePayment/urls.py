from django.urls import path, include

from .views import checkout

urlpatterns = [
    # url(r'^create-charge/$', checkout, name="cout"),
    path('creat-charge/', checkout, name="cout")

]
