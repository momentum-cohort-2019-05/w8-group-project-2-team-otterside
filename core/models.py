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

        # Languages for Dropdown
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
        # Field for user to enter the code for a snippet
        code = models.TextField(help_text="Enter the snippet code")
        
        # Description field is optional
        description = models.TextField(max_length=200, null=True, blank=True, help_text="Enter a docstring to describe the snippet of code.")
        
        # More descriptive than user
        creator = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)

        date_added = models.DateTimeField(auto_now_add=True)

         # ManyToManyField used because user list can contain many snippets 
        copy_snippet = models.ManyToManyField(to=CustomUser, through='UserPage', help_text='Click to add snippet to user page.', related_name='LoggedIn')
        
        class Meta: 
            ordering = ['-date_added']

        def __str__(self):
            """String for representing the Model object."""
            return f'{self.title}'
        
        def get_absolute_url(self):
            return reverse('snippet-detail', args=[str(self.id)])


class UserPage(models.Model):
    """Model representing a user selecting a snippet to add to user page"""
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    snippet = models.ForeignKey(Snippet, on_delete=models.CASCADE)
    copied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-copied_at']
    
    def __str__(self):
        """String for representing the copied object."""
        return f"{self.user.username} - {self.snippet.title}"





