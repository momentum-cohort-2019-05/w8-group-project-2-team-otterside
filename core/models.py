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
        title = models.CharField(max_length=200, help_text="Enter title for snippet of code")
        PYTHON = 'python'
        JAVASCRIPT = 'js'
        HTML = 'html'
        LUA = 'lua'
        CSS = 'css'
        CLIKE = 'clike'
        MARKUP = 'markup'
        HTML = 'html'
        BASH = 'bash'
        DJANGO ='django'
        GO = 'go'
        JSON = 'json'
        HTTP = 'http'
        PHP = 'php'
        RUBY = 'ruby'
        SAS = 'sas'
        SASS = 'sass'
        SCSS = 'scss'
        SQL = 'sql'

        LANGUAGE_CHOICES = [
        (PYTHON, 'python'),
        (JAVASCRIPT, 'js'),
        (HTML, 'html'),
        (LUA, 'lua'),
        (CSS, 'css'),
        (CLIKE, 'clike'),
        (MARKUP, 'markup'),
        (HTML, 'html'),
        (BASH, 'bash'),
        (DJANGO, 'django'),
        (GO, 'go'),
        (JSON, 'json'),
        (HTTP, 'http'),
        (PHP, 'php'),
        (RUBY, 'ruby'),
        (SAS, 'sas'),
        (SASS, 'sass'),
        (SCSS, 'scss'),
        (SQL, 'sql'),
        ]

        languages = models.CharField(
        max_length=7,
        choices=LANGUAGE_CHOICES,
        default=HTML,
    )

        code = models.TextField(help_text="Enter the snippet code")
        
        # Description field is optional
        description = models.TextField(max_length=200, null=True, blank=True, help_text="Enter a docstring to describe the snippet of code.")
        
        # More descriptive than user
        creator = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)

        date_added = models.DateTimeField(auto_now_add=True)
        
        class Meta: 
            ordering = ['-date_added']

        def __str__(self):
            """String for representing the Model object."""
            return f'{self.title}'
        
        def get_absolute_url(self):
            return reverse('edit_snippet', args=[str(self.pk)])




