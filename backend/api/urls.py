from django.urls import path
from . import views

urlpatterns = [
    path('stepper/plan-trip', views.plan_trip_stepper, name='plan-trip-stepper'),
    path('trips', views.trips_collection, name='trips'),
    path('trips/<uuid:trip_id>', views.trip_detail, name='trip-detail'),
]
