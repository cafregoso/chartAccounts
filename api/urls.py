from django.urls import path
from .views import ChartView, CreateChartView, ChartRetriveUpdateDestroy

urlpatterns = [
    path('charts/', ChartView.as_view()),
    path('chart/<int:pk>', CreateChartView.as_view()),
    path('delete-chart/<int:pk>', ChartRetriveUpdateDestroy.as_view()),
]
