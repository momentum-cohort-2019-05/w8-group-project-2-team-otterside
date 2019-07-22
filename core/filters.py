import django_filters
from core.models import Snippet

# Using Django Filter to search for snippets
class SnippetFilter(django_filters.FilterSet):

    class Meta:
        model=Snippet

        fields = {
            'title': ['icontains',], 
            'languages': ['exact',], 
            'code': ['icontains',],
            'creator': ['exact',], 
        }