from rest_framework import serializers
from .models import StepperConfig, Trip, TripStep


class StepperConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = StepperConfig
        fields = ['name', 'steps', 'updated_at']


class TripStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripStep
        fields = ['key', 'data', 'order']


class TripSerializer(serializers.ModelSerializer):
    steps = TripStepSerializer(many=True, required=False)

    class Meta:
        model = Trip
        fields = ['id', 'data', 'status', 'created_at', 'updated_at', 'steps']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def create(self, validated_data):
        steps_data = validated_data.pop('steps', [])
        trip = Trip.objects.create(**validated_data)
        for idx, step in enumerate(steps_data):
            TripStep.objects.create(trip=trip, order=step.get('order', idx), **step)
        return trip

    def update(self, instance, validated_data):
        steps_data = validated_data.pop('steps', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if steps_data is not None:
            # Simple strategy: replace steps by provided list
            instance.steps.all().delete()
            for idx, step in enumerate(steps_data):
                TripStep.objects.create(trip=instance, order=step.get('order', idx), **step)
        return instance
