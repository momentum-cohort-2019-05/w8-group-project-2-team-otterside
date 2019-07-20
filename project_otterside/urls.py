"""project_otterside URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from core import views as core_views
from django.contrib.auth import logout

urlpatterns = [
    path('', core_views.index, name='index'), 
    path('admin/', admin.site.urls),
    path('accounts/', include('registration.backends.simple.urls')),
    path('add_snippet', core_views.add_snippet, name='add_snippet'),
    path('core/snippet/<int:pk>/change/', core_views.SnippetUpdate.as_view(), name='edit_snippet'),
    path('core/snippet/<int:pk>/delete/', core_views.SnippetDelete.as_view(), name='delete_snippet'),
    path('', include('social_django.urls', namespace='social')),
    path('logout/', logout, {'next_page': settings.LOGOUT_REDIRECT_URL},
    name='logout'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),

        # For django versions before 2.0:
        # url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

SOCIAL_AUTH_URL_NAMESPACE = "users:social"