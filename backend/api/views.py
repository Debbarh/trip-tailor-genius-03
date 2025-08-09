from typing import List
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import StepperConfig, Trip
from .serializers import StepperConfigSerializer, TripSerializer

DEFAULT_PLAN_TRIP_STEPS: List[dict] = [
    {"id": "destination", "title": "Destination", "enabled": True, "order": 1},
    {"id": "travelWith", "title": "Compagnons de voyage", "enabled": True, "order": 2},
    {"id": "budget", "title": "Budget", "enabled": True, "order": 3},
    {"id": "cuisine", "title": "Préférences culinaires", "enabled": True, "order": 4},
    {"id": "accommodation", "title": "Hébergement", "enabled": True, "order": 5},
    {"id": "activities", "title": "Activités", "enabled": True, "order": 6},
    {"id": "review", "title": "Résumé", "enabled": True, "order": 7},
]


@api_view(['GET', 'PUT'])
def plan_trip_stepper(request):
    cfg, created = StepperConfig.objects.get_or_create(
        name='plan-trip', defaults={'steps': DEFAULT_PLAN_TRIP_STEPS}
    )

    if request.method == 'GET':
        return Response(StepperConfigSerializer(cfg).data)

    # PUT
    serializer = StepperConfigSerializer(cfg, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
def trips_collection(request):
    if request.method == 'GET':
        # Optionally support listing with pagination later; for now return empty or last 20
        qs = Trip.objects.order_by('-created_at')[:20]
        return Response(TripSerializer(qs, many=True).data)

    # POST
    serializer = TripSerializer(data=request.data)
    if serializer.is_valid():
        trip = serializer.save()
        return Response(TripSerializer(trip).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT'])
def trip_detail(request, trip_id):
    trip = get_object_or_404(Trip, id=trip_id)

    if request.method == 'GET':
        return Response(TripSerializer(trip).data)

    serializer = TripSerializer(trip, data=request.data, partial=True)
    if serializer.is_valid():
        trip = serializer.save()
        return Response(TripSerializer(trip).data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
