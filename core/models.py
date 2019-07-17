from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.urls import reverse

# Models Created for Code Snippet Manager
class CustomUser(AbstractUser):
    """Model Representing a User"""
    user_email = models.EmailField(max_length=255)

    
class Snippet(models.Model):
        """Model Representing a Snippet Model"""
        snippet_title = models.CharField(max_length=200, help_text="Enter title for snippet of code")
        
        snippet_lang = models.CharField(max_length=100, help_text="Enter the language for snippet of code (i.e. Python, Java, C#, Ruby, etc...)")
        snippet_code = models.TextField(help_text="Enter the snippet code")
        
        # Description field is optional
        snippet_description = models.TextField(max_length=1000, null=True, blank=True, help_text="Enter a docstring to describe the snippet of code.")
        
        # More descriptive than user
        snippet_creator = models.ForeignKey(to=User, on_delete=models.CASCADE)

        date_added = models.DateTimeField(auto_now_add=True)
        
        class Meta: 
            ordering = ['-date_added']

        def __str__(self):
            """String for representing the Model object."""
            return f'{self.snippet_title}'
        
        def get_absolute_url(self):
            return reverse('snippet', args=[str(self.pk)])




