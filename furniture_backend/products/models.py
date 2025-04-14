from django.db import models


class Category(models.Model):
    """
    Model for product categories.
    Maps to the existing products_category table in the database.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # image_url = models.URLField(blank=True, null=True)

    class Meta:
        db_table = 'products_category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Feature(models.Model):
    """
    Model for product features.
    Maps to the existing products_feature table in the database.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_feature'
        verbose_name = 'Feature'
        verbose_name_plural = 'Features'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Model for products.
    Maps to the existing products_product table in the database.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    features = models.ManyToManyField(Feature, related_name='products')
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'products_product'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'
        ordering = ['-created_at']

    def __str__(self):
        return self.name


# Chair Customization Models

class ColorOption(models.Model):
    """
    Model for chair color options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    hex_code = models.CharField(max_length=7)  # Format: #RRGGBB
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_color_option'
        verbose_name = 'Color Option'
        verbose_name_plural = 'Color Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class MaterialOption(models.Model):
    """
    Model for chair material options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.URLField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_material_option'
        verbose_name = 'Material Option'
        verbose_name_plural = 'Material Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class ChairTypeOption(models.Model):
    """
    Model for chair type options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_chair_type_option'
        verbose_name = 'Chair Type Option'
        verbose_name_plural = 'Chair Type Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class ChairTypeFeature(models.Model):
    """
    Model for features associated with chair types.
    """
    chair_type = models.ForeignKey(ChairTypeOption, on_delete=models.CASCADE, related_name='type_features')
    feature = models.CharField(max_length=100)

    class Meta:
        db_table = 'products_chair_type_feature'
        verbose_name = 'Chair Type Feature'
        verbose_name_plural = 'Chair Type Features'
        unique_together = ('chair_type', 'feature')

    def __str__(self):
        return f"{self.chair_type.name} - {self.feature}"


class LeatherTypeOption(models.Model):
    """
    Model for leather type options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    texture = models.URLField()  # URL to the texture image
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_leather_type_option'
        verbose_name = 'Leather Type Option'
        verbose_name_plural = 'Leather Type Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class BaseDesignOption(models.Model):
    """
    Model for chair base design options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.URLField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_base_design_option'
        verbose_name = 'Base Design Option'
        verbose_name_plural = 'Base Design Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class WheelDesignOption(models.Model):
    """
    Model for chair wheel design options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    image = models.URLField()
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_wheel_design_option'
        verbose_name = 'Wheel Design Option'
        verbose_name_plural = 'Wheel Design Options'
        ordering = ['name']

    def __str__(self):
        return self.name


class ArmrestOption(models.Model):
    """
    Model for chair armrest options.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    material = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'products_armrest_option'
        verbose_name = 'Armrest Option'
        verbose_name_plural = 'Armrest Options'
        ordering = ['name']

    def __str__(self):
        return self.name
