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
from django.contrib.auth import logout

# Core APP
from core import views as core_views
# Core_API APP
from rest_framework import routers
from core_api import views as core_api_views
from core_api.views import SnippetViewSet, CustomUserViewSet

router = routers.DefaultRouter()
router.register(r'snippets', SnippetViewSet)
router.register(r'customusers', CustomUserViewSet)

urlpatterns = [
    path('', core_views.index, name='index'), 
    path('admin/', admin.site.urls),
    path('accounts/', include('registration.backends.simple.urls')),
    path('snippets/', core_views.SnippetListView.as_view(), name='snippets'),
    path('snippet/<int:pk>', core_views.SnippetDetailView.as_view(), name='snippet-detail'),
    path('add_snippet', core_views.add_snippet, name='add_snippet'),
    path('core/snippet/<int:pk>/change/', core_views.SnippetUpdate.as_view(), name='edit_snippet'),
    path('delete/', core_views.delete_snippet, name='delete_snippet'),
    path('snippet/<int:pk>/copy_snippet/', core_views.copy_snippet, name='copy_snippet'),
    path('user_page/', core_views.user_view, name='user_page'),

    # Wire up API using automatic URL routing.
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include(router.urls)),
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