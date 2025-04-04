# from django.db import models

# class Category(models.Model):
#     name = models.CharField(max_length=100)
#     icon = models.CharField(max_length=50)
#     image = models.URLField()

#     def __str__(self):
#         return self.name

# class Feature(models.Model):
#     icon = models.CharField(max_length=50)
#     title = models.CharField(max_length=100)
#     description = models.TextField()

#     def __str__(self):
#         return self.title

# class Product(models.Model):
#     name = models.CharField(max_length=200)
#     price = models.DecimalField(max_digits=10, decimal_places=2)
#     rating = models.DecimalField(max_digits=3, decimal_places=1)
#     image = models.URLField()
#     category = models.ForeignKey(Category, on_delete=models.CASCADE)
#     description = models.TextField()
#     features = models.JSONField()
#     dimensions = models.JSONField()
#     colors = models.JSONField()
#     in_stock = models.BooleanField(default=True)
#     is_top = models.BooleanField(default=False)

#     def __str__(self):
#         return self.name

from django.db import models
from django.contrib import admin
from django.utils.html import format_html

class Category(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=50)
    image = models.URLField()
    
    def __str__(self):
        return self.name

class Feature(models.Model):
    icon = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    image = models.URLField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    features = models.JSONField()
    dimensions = models.JSONField()
    colors = models.JSONField()
    in_stock = models.BooleanField(default=True)
    is_top = models.BooleanField(default=False)
    is_customizable = models.BooleanField(default=False)
    customization_options = models.JSONField(default=dict, blank=True)
    
    def __str__(self):
        return self.name
    
    @admin.display(description="Image Preview")
    def image_preview(self):
        return format_html('<img src="{}" width="100" />', self.image)

class ChairType(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField()
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return self.name

class CustomizationOption(models.Model):
    OPTION_TYPES = [
        ('COLOR', 'Color'),
        ('MATERIAL', 'Material'),
        ('BASE', 'Base Type'),
        ('ARMREST', 'Armrest'),
    ]
    
    name = models.CharField(max_length=100)
    option_type = models.CharField(max_length=20, choices=OPTION_TYPES)
    chair_type = models.ForeignKey(ChairType, on_delete=models.CASCADE)
    price_modifier = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image = models.URLField(blank=True, null=True)
    color_code = models.CharField(max_length=7, blank=True)
    
    def __str__(self):
        return f"{self.chair_type.name} - {self.name}"