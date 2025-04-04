from django.contrib import admin
from .models import Category, Feature, Product, ChairType, CustomizationOption

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'in_stock', 'is_top', 'image_preview')
    list_filter = ('category', 'in_stock', 'is_top')
    search_fields = ('name', 'description')
    readonly_fields = ('image_preview',)
    fieldsets = (
        ('Basic Info', {
            'fields': ('name', 'category', 'price', 'rating', 'description')
        }),
        ('Inventory', {
            'fields': ('in_stock', 'is_top', 'is_customizable')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Specifications', {
            'fields': ('features', 'dimensions', 'colors')
        }),
        ('Customization', {
            'fields': ('customization_options',),
            'classes': ('collapse',)
        }),
    )

class CustomizationOptionInline(admin.TabularInline):
    model = CustomizationOption
    extra = 1

class ChairTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'base_price')
    inlines = [CustomizationOptionInline]

admin.site.register(Category)
admin.site.register(Feature)
admin.site.register(Product, ProductAdmin)
admin.site.register(ChairType, ChairTypeAdmin)