from django.db import models
from django.contrib.auth.models import User

# Models Created for Code Snippet Manager
class Snippet(models.Model):
        """Model Representing a Snippet Model"""
        snippet_title = models.CharField(max_length=200, help_text="Enter title for snippet of code")

        snippet_code = models.TextField(help_text="Enter the snippet code")
        snippet_lang = models.CharField(max_length=100, help_text="Enter the language for snippet of code (i.e. Python, Java, C#, Ruby, etc...)")
        snippet_description = models.TextField(max_length=1000, help_text="Enter a docstring to describe the snippet of code.")
        user = models.ForeignKey(User, on_delete=models.CASCADE)

        def __str__(self):
            """String for representing the Model object."""
            return self.snippet_title

