import { Request, Response } from 'express';
import db from '../data/db';
import { Vehicle } from '../models/vehicle';

const vehicleService = {
    /**
     * Fetches a list of vehicles from the database.
     *
     * @returns {Promise<Array>} A promise that resolves to an array of vehicle objects.
     * If an error occurs, it logs the error and returns an empty array.
     */
    async getVehicles(): Promise<Vehicle[]> {
        try {
            const { rows } = await db.query('SELECT * FROM vehicles LIMIT 100', []);
            return rows;
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return [];
        }
    }
};

export default vehicleService;