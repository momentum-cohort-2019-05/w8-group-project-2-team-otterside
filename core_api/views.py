from django.shortcuts import render
from core.models import User, Snippet
from core_api.serializers import UserSerializer, SnippetSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView


# Views for API Created Here
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer



class SnippetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows snippets to be viewed or edited.
    """
    queryset = Snippet.objects.all().order_by('-date_added')
    serializer_class = SnippetSerializer



class DeleteSnippet(generics.DestroyAPIView):
    """
    API endpoint that allows snippets to be deleted.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer