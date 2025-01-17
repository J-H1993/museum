const request = require('supertest')
const app = require('../app')
jest.mock('../models/museum.model')
const {getArtworks} = require('../models/museum.model')



getArtworks.mockResolvedValue([
    {
        id: 'edanmdm-nmah_123456',
        title: 'Beautiful Artwork',
        content: {
            descriptiveNonRepeating: {
                title: 'Beautiful Artwork',
                online_media: {
                    media: [
                        {
                            thumbnail: 'https://example.com/thumb.jpg',
                            content: 'https://example.com/full.jpg',
                        },
                    ],
                },
                record_link: 'https://example.com/object',
                data_source: 'Example Museum',
            },
            freetext: {
                name: [{ content: 'Artist Name' }],
                date: [{ content: '1800' }],
            },
        },
    },
]);

describe('GET /api/artworks', () => {
    test('200: return an array of artworks', async () => {
      const response = await request(app).get('/api/artworks');
      expect(response.status).toBe(200);
      const { artworks } = response.body;
      expect(Array.isArray(artworks)).toBe(true);
      expect(artworks.length).toBeGreaterThan(0);
      
      artworks.forEach((item) => {
        expect(item).toMatchObject({
          id: expect.any(String),
          title: expect.any(String),
          content: {
            descriptiveNonRepeating: {
              title: expect.any(String),
              online_media: {
                media: [
                  {
                    thumbnail: expect.any(String),
                    content: expect.any(String)
                  }
                ]
              },
              record_link: expect.any(String),
              data_source: expect.any(String)
            },
            freetext: {
              name: expect.any(Array),
              date: expect.any(Array)
            }
          }
        });
      });
    });
  });

  describe("GET /api/artworks when Smithsonian API returns 404", ()=>{
    test("404: returns 'Artworks not found' message if artworks are not found at the Smithsonian API", async () =>{
        getArtworks.mockRejectedValue({response:{status:404}})
        const response = await request(app).get("/api/artworks")
        expect(response.status).toBe(404)
        expect(response.body.msg).toBe("Artworks not found")
    })
  })

  describe("404: handles an invalid route", () =>{
    test("404: returns 'not found' when API users endpoint is invalid due to a typo or a differing enpoint is received", async ()=>{
        const response = await request(app).get("/api/artowrk")
        expect(response.status).toBe(404)
        expect(response.body.msg).toBe("Invalid request")
    })
  })
  