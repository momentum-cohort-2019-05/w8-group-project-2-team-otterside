from core.models import User, Snippet
from rest_framework import serializers

# Serializers Created Here
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ['url', 'title', 'languages', 'code', 'description', 'creator', 'date_added', 'pk']