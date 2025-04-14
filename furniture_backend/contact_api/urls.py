# contact_api/urls.py
from django.urls import path
from .views import ContactFormView, verify_email

urlpatterns = [
    path('contact/', ContactFormView.as_view(), name='contact-form'),
    path('verify-email/<uuid:token>/', verify_email, name='verify-email'),
]