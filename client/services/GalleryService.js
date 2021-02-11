import axios from 'axios';

const url = 'http://localhost:3000/galleries/'

class GalleryService {
    static async getGalleries(uid) {
        var res = await axios.get(`${url}user/${uid}`);
        return res.data;
    }

    static async getGallery(id) {
        var res = await axios.get(`${url}gallery/${id}`)
        return res.data;
    }

    static async updateGalleryName(id, name) {
        axios.put(`${url}${id}`, {
            name: name
        }).catch(err => {
            console.log(err);
        })
    }

    static insertGallery(uid, name, pictures, thumbnail) {
        axios.post(`${url}upload/${uid}`, {
            name: name,
            pictures: pictures,
            thumbnail: thumbnail
        }).catch(e => {
            console.log(e);
        })
    }

    static deleteGallery(id) {
        axios.delete(`${url}${id}`).catch(e => {
            console.log(e);
        })
    }
}

export default GalleryService;