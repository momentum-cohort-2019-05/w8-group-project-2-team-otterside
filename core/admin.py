from django.contrib import admin
from core.models import Snippet, AbstractUser

# Models registered for Code Snippet 

 # Register the Admin classes for BookAuthor using the decorator
@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    pass


@admin.register(AbstractUser)
class User(admin.ModelAdmin):
    pass