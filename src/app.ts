import express, { Request, Response } from 'express';
import path from 'path';
import vehicleService from './services/vehicleService';


const app = express();
const port = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req: Request, res: Response) => {
    var vehicles = await vehicleService.getVehicles();
    res.render('index', { title: 'Vehicles', vehicles: vehicles });
});

app.get('/api/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicles = await vehicleService.getVehicles();
        vehicles.sort((a, b) => a.model.localeCompare(b.model));
        res.json(vehicles);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});