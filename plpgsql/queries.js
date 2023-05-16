const Pool = require('pg').Pool
require('dotenv').config();

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
  });


// JSON
/*const getAsRows = (request, response) =>{ 
    pool.query('select * from mahalle', (error,result)=>{
        if (error){
            throw error
        } 
        else {
        response.status(200).json(result.rows)
    } 
    } )
}*/



// GeoJson
const getAsGeojson = (request, response) => {
    pool.query(
      `SELECT jsonb_build_object(
         'type','FeatureCollection',
         'features', jsonb_agg(feature)
       )
       FROM (
         SELECT jsonb_build_object(
           'type', 'Feature',
           'id', id,
           'geometry', ST_AsGeoJSON(geom)::jsonb,
           'properties', to_jsonb(mahalle) - 'id' - 'geom'
         ) AS feature
         FROM mahalle
       ) features`, (error, result) => {
          if (error) {
              throw error
          } else {
              response.status(200).json(result.rows[0])
          } 
        }
     );
};
  
module.exports = {getAsGeojson};
  
  