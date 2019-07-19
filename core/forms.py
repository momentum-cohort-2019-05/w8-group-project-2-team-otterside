from django import forms
from django.db.models import TextField
from .models import Snippet, CustomUser

class SnippetForm(forms.ModelForm):

    class Meta:
        model = Snippet
        fields = ('title', 'languages', 'code', 'description', 'creator',)
