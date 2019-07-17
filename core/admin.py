from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from core.models import Snippet, CustomUser

# Models registered for Code Snippet 

@admin.register(Snippet)
class SnippetAdmin(admin.ModelAdmin):
    pass


class CustomUserAdmin(UserAdmin):
    model = CustomUser

admin.site.register(CustomUser, CustomUserAdmin)