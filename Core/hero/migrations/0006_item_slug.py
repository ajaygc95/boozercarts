# Generated by Django 3.2 on 2021-05-26 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hero', '0005_orderitem_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='slug',
            field=models.SlugField(default=None, null=True),
        ),
    ]
