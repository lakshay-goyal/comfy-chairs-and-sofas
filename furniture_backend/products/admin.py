from django.contrib import admin
from .models import (
    Category, Feature, Product,
    ColorOption, MaterialOption, ChairTypeOption, ChairTypeFeature,
    LeatherTypeOption, BaseDesignOption, WheelDesignOption, ArmrestOption
)


# Product Models Admin

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')


class ProductFeatureInline(admin.TabularInline):
    model = Product.features.through
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'category', 'is_active', 'created_at')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'price', 'stock', 'category', 'image_url', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    inlines = [ProductFeatureInline]


# Chair Customization Models Admin

@admin.register(ColorOption)
class ColorOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code', 'created_at', 'updated_at')
    search_fields = ('name', 'hex_code')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(MaterialOption)
class MaterialOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


class ChairTypeFeatureInline(admin.TabularInline):
    model = ChairTypeFeature
    extra = 1


@admin.register(ChairTypeOption)
class ChairTypeOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name',)
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ChairTypeFeatureInline]


@admin.register(LeatherTypeOption)
class LeatherTypeOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(BaseDesignOption)
class BaseDesignOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(WheelDesignOption)
class WheelDesignOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(ArmrestOption)
class ArmrestOptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'material', 'created_at', 'updated_at')
    search_fields = ('name', 'material', 'description')
    list_filter = ('material',)
    readonly_fields = ('created_at', 'updated_at')
