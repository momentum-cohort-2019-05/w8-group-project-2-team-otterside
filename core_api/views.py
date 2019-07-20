from django.shortcuts import render
from core.models import CustomUser, Snippet
from core_api.serializers import CustomUserSerializer, SnippetSerializer
from rest_framework import viewsets
from rest_framework import generics


# Views for API Created Here
class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows custom user to be viewed or edited.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer



class SnippetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows snippets to be viewed or edited.
    """
    queryset = Snippet.objects.all().order_by('-date_added')
    serializer_class = SnippetSerializer