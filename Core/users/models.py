from django.db import models


class Book(models.Model):
    title = models.TextField(max_length=32, blank=False, null=False)

# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
#
#
# class UserAccountManager(BaseUserManager):
#     def create_user(self, email, firstname,lastname, phonenumber, password=None,):
#
#         if not email:
#             raise ValueError('Users must have an email address')
#         email = self.normalize_email(email)
#         user = self.model(email=email, name=firstname)
#         user.set_password(password)
#         user.save()
#
# class UserAccount(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(max_length=255, unique=True)
#     firstname = models.CharField(max_length=255)
#     lastname = models.CharField(max_length=255)
#     is_active = models.BooleanField(default=True)
#     is_staff = models.BooleanField(default=True)
#
#     objects = UserAccountManager()
#
#     USERNAME_FILED = 'email'
#     REQUIRED_FIELDS = ['firstname','lastname','phonenumber']
#
#     def get_full_name(self):
#         return self.firstname + " " + self.lastname
#
#     def get_short_name(self):
#         return self.firstname
#
#     def __str__(self):
#         return self.email
