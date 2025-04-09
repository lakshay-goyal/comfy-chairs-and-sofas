from django.core.management.base import BaseCommand
from products.models import Category, Feature, Product


class Command(BaseCommand):
    help = 'Add sample products, categories, and features to the database'

    def handle(self, *args, **kwargs):
        self.stdout.write('Adding sample product data...')

        # Create sample categories
        categories = [
            {'name': 'Living Room', 'description': 'Furniture for your living room'},
            {'name': 'Bedroom', 'description': 'Comfortable bedroom furniture'},
            {'name': 'Dining Room', 'description': 'Elegant dining room furniture'},
            {'name': 'Office', 'description': 'Professional office furniture'},
        ]

        created_categories = {}
        for category_data in categories:
            category, created = Category.objects.get_or_create(
                name=category_data['name'],
                defaults={'description': category_data['description']}
            )
            created_categories[category.name] = category
            if created:
                self.stdout.write(f'Added category: {category.name}')
            else:
                self.stdout.write(f'Category already exists: {category.name}')

        # Create sample features
        features = [
            {'name': 'Adjustable Height', 'description': 'Height can be adjusted'},
            {'name': 'Foldable', 'description': 'Can be folded for storage'},
            {'name': 'Stain Resistant', 'description': 'Resistant to stains'},
            {'name': 'Water Resistant', 'description': 'Resistant to water damage'},
            {'name': 'Easy Assembly', 'description': 'Can be assembled easily'},
        ]

        created_features = {}
        for feature_data in features:
            feature, created = Feature.objects.get_or_create(
                name=feature_data['name'],
                defaults={'description': feature_data['description']}
            )
            created_features[feature.name] = feature
            if created:
                self.stdout.write(f'Added feature: {feature.name}')
            else:
                self.stdout.write(f'Feature already exists: {feature.name}')

        # Create sample products
        products = [
            {
                'name': 'Modern Sofa',
                'description': 'A comfortable modern sofa for your living room',
                'price': 599.99,
                'stock': 10,
                'category': 'Living Room',
                'image_url': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
                'features': ['Stain Resistant', 'Water Resistant'],
            },
            {
                'name': 'Queen Bed Frame',
                'description': 'Elegant queen-sized bed frame',
                'price': 499.99,
                'stock': 5,
                'category': 'Bedroom',
                'image_url': 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
                'features': ['Easy Assembly'],
            },
            {
                'name': 'Dining Table Set',
                'description': 'Dining table with 6 chairs',
                'price': 899.99,
                'stock': 3,
                'category': 'Dining Room',
                'image_url': 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc',
                'features': ['Water Resistant', 'Stain Resistant'],
            },
            {
                'name': 'Office Desk',
                'description': 'Spacious office desk with drawers',
                'price': 349.99,
                'stock': 8,
                'category': 'Office',
                'image_url': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd',
                'features': ['Easy Assembly', 'Adjustable Height'],
            },
            {
                'name': 'Armchair',
                'description': 'Comfortable armchair for your living room',
                'price': 299.99,
                'stock': 12,
                'category': 'Living Room',
                'image_url': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
                'features': ['Stain Resistant'],
            },
            {
                'name': 'Nightstand',
                'description': 'Wooden nightstand with two drawers',
                'price': 129.99,
                'stock': 15,
                'category': 'Bedroom',
                'image_url': 'https://images.unsplash.com/photo-1551215717-8bc8cfe833ee',
                'features': ['Easy Assembly'],
            },
            {
                'name': 'Bookshelf',
                'description': 'Modern bookshelf with adjustable shelves',
                'price': 249.99,
                'stock': 7,
                'category': 'Living Room',
                'image_url': 'https://images.unsplash.com/photo-1594620302200-9a762244a156',
                'features': ['Easy Assembly'],
            },
            {
                'name': 'Office Chair',
                'description': 'Ergonomic office chair with lumbar support',
                'price': 199.99,
                'stock': 20,
                'category': 'Office',
                'image_url': 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
                'features': ['Adjustable Height', 'Easy Assembly'],
            },
        ]

        for product_data in products:
            category = created_categories.get(product_data['category'])
            if not category:
                self.stdout.write(self.style.WARNING(f"Category {product_data['category']} not found, skipping product {product_data['name']}"))
                continue

            # Check if product already exists
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'description': product_data['description'],
                    'price': product_data['price'],
                    'stock': product_data['stock'],
                    'category': category,
                    'image_url': product_data['image_url'],
                    'is_active': True,
                }
            )

            if created:
                # Add features
                for feature_name in product_data['features']:
                    feature = created_features.get(feature_name)
                    if feature:
                        product.features.add(feature)
                self.stdout.write(f'Added product: {product.name}')
            else:
                self.stdout.write(f'Product already exists: {product.name}')

        self.stdout.write(self.style.SUCCESS('Successfully added sample product data'))