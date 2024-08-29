import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {apiRoot, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {DeviceModel} from "../model/device.model";

@Injectable({
    providedIn: 'root',
})
export class DeviceService {

    constructor(
        private http: HttpClient,
    ) {
    }

    retrieveAllDevices(): Observable<any> {
        return this.http.get(`${apiRoot}/device`, httpoptions)
    }

    retrieveOneDevice(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/device/${id}`, httpoptions)
    }

    retrieveDeviceById(device_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/device/${device_id}`, httpoptions);
    }

    registerDevice(device: DeviceModel): Observable<DeviceModel> {
        return this.http.post<DeviceModel>(`${apiRoot}/device`, device, httpoptions)
    }


    async getDeviceAll() {
        let res = await lastValueFrom(this.retrieveAllDevices())
        return this.formatData(res)
    }

    async getDeviceOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneDevice(id))
        return this.formatData([res])
    }

    formatData(rawdata: DeviceModel[]) {
        const temp: DeviceModel[] = []

        rawdata.map((el) => {
            let tempObj: DeviceModel = new DeviceModel(el.id, el.name, el.price, el.qr_code,el.category, el.user_id, el.user)
            temp.push(tempObj);
        });
        // console.log('Data formatté: ', temp)
        return temp
    }

    /**
     * Récupère les appareils d'un utilisateur
     * @param userId
     */
    getDevicesByUserId(userId: number): Observable<DeviceModel[]> {
        return this.http.get<DeviceModel[]>(`${apiRoot}/device/user/${userId}`, httpoptions);
    }

    /**
     * Met à jour un appareil
     * @param id
     * @param device
     */
    updateDevice(id: number, device: any): Observable<DeviceModel> {
        return this.http.put<DeviceModel>(`${apiRoot}/device/${id}`, device, httpoptions);
    }

    /**
     * Retire la lien d'un appareil à un utilisateur
     * @param device_id
     */
    unsetDevice(device_id: number): Observable<DeviceModel> {
        return this.http.put<DeviceModel>(`${apiRoot}/device/unset/${device_id}`,{},  httpoptions);
    }

    /**
     * Supprime un appareil
     * @param device_id
     */
    deleteDevice(device_id: number): Observable<any> {
        return this.http.delete(`${apiRoot}/device/${device_id}`, httpoptions);
    }

    /**
     * Récupère les appareils
     */
    getDevices() {
        return this.http.get<DeviceModel[]>(`${apiRoot}/device`, httpoptions)
    }
}
