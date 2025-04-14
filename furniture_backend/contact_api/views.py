# contact_api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .serializers import ContactSerializer
from .models import ContactSubmission
import uuid

class ContactFormView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Create the submission but don't save yet
            # submission = serializer.save(commit=False)
            submission = serializer.save()
            
            # Generate verification token
            submission.verification_token = uuid.uuid4()
            submission.save()
            
            # Build verification URL
            verification_url = f"{request.scheme}://{request.get_host()}/api/verify/{submission.verification_token}/"
            
            # Send verification email
            try:
                send_mail(
                    'Verify your email address',
                    f'Please click this link to verify your email: {verification_url}',
                    settings.DEFAULT_FROM_EMAIL,
                    [submission.email],
                    fail_silently=False,
                )
                print(f"Email error: {str(e)}")
                return Response({'status': 'verification_sent'}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Add a verification endpoint
from django.http import HttpResponse
from django.shortcuts import get_object_or_404

def verify_email(request, token):
    submission = get_object_or_404(ContactSubmission, verification_token=token, is_verified=False)
    submission.is_verified = True
    submission.save()
    
    # Now send the message to admin email
    send_mail(
        f'New Contact Form: {submission.subject}',
        f'Name: {submission.name}\nEmail: {submission.email}\nMessage: {submission.message}',
        settings.DEFAULT_FROM_EMAIL,
        ['lakug2004@gmail.com'],
        fail_silently=False,
    )
    
    return HttpResponse("Email verified! Your message has been sent.")