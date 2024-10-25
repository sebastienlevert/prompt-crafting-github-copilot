// src/tests/vehicleService.test.ts

import { expect } from 'chai';
import sinon from 'sinon';
import vehicleService from '../src/services/vehicleService';
import db from '../src/data/db';

describe('Vehicle Service', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should return a list of vehicles', async () => {
        const mockVehicles = [
            {
                "vin": "3C3CFFGE8D",
                "county": "King",
                "city": "Bellevue",
                "state": "WA",
                "postal_code": "98004",
                "model_year": 2013,
                "make": "FIAT",
                "model": "500",
                "electric_vehicle_type": "Battery Electric Vehicle (BEV)",
                "clean_alternative_fuel_vehicle_eligibility": "Clean Alternative Fuel Vehicle Eligible",
                "electric_range": 87,
                "base_msrp": 0,
                "legislative_district": 41,
                "dol_vehicle_id": "267527928",
                "vehicle_location": "POINT (-122.202397 47.619252)",
                "electric_utility": "PUGET SOUND ENERGY INC||CITY OF TACOMA - (WA)",
                "census_tract_2020": "53033023901"
            },
            {
                "vin": "3C3CFFGE4F",
                "county": "Snohomish",
                "city": "Lake Stevens",
                "state": "WA",
                "postal_code": "98258",
                "model_year": 2015,
                "make": "FIAT",
                "model": "500",
                "electric_vehicle_type": "Battery Electric Vehicle (BEV)",
                "clean_alternative_fuel_vehicle_eligibility": "Clean Alternative Fuel Vehicle Eligible",
                "electric_range": 87,
                "base_msrp": 0,
                "legislative_district": 44,
                "dol_vehicle_id": "292932748",
                "vehicle_location": "POINT (-122.0816912 48.0122934)",
                "electric_utility": "PUGET SOUND ENERGY INC",
                "census_tract_2020": "53061052706"
            }
        ];

        //sinon.stub(db, 'query').resolves({ rows: mockVehicles });

        const vehicles = await vehicleService.getVehicles();
        expect(vehicles).to.deep.equal(mockVehicles);
    });

    it('should handle errors gracefully', async () => {
        sinon.stub(db, 'query').rejects(new Error('Database error'));

        try {
            await vehicleService.getVehicles();
        } catch (error) {
            expect(error).to.equal('Database error');
        }
    });
});