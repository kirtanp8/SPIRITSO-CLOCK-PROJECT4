# Generated by Django 3.2.9 on 2021-12-21 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='carbs',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='fat',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='protein',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='salt',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='saturates',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='sugars',
            field=models.DecimalField(decimal_places=2, default=None, max_digits=10),
        ),
    ]
