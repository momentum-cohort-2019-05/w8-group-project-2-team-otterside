from django import forms
from django.db.models import TextField
from .models import Snippet, CustomUser

class SnippetForm(forms.ModelForm):

    class Meta:
        model = Snippet
        fields = ('snippet_title', 'snippet_lang', 'snippet_code', 'snippet_description', 'snippet_creator',)
