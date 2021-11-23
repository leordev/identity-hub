import { v4 as uuidv4 } from 'uuid'

export const DEFAULT_IDENTITY_HUB_URL = 'http://localhost:1337'

const SPEC_INTERFACES = [
  'FeatureDetectionRead',
  'ProfileRead',
  'ProfileWrite',
  'ProfileDelete',
  'CollectionsQuery',
  'CollectionsWrite',
  'CollectionsDelete',
  'ActionsQuery',
  'ActionsCreate',
  'ActionsUpdate',
  'ActionsDelete',
  'ActionsBatch',
  'PermissionsQuery',
  'PermissionsRequest',
  'PermissionsUpdate',
  'PermissionsDelete',
  'PermissionsBatch',
]

export interface InterfacesStatus {
  [key: string]: boolean
}

export class IdentityHubClient {
  private url: string

  constructor(url = DEFAULT_IDENTITY_HUB_URL) {
    this.url = url
  }

  async callFeatureDetectionRead(target: string): Promise<InterfacesStatus> {
    const message = {
      descriptor: {
        method: 'FeatureDetectionRead',
      },
    }

    const data = await this.pushMessage(target, [message])

    const { interfaces } = data.replies[0].entries
    return SPEC_INTERFACES.reduce((map, interfaceKey) => {
      map[interfaceKey] = interfaces[interfaceKey]
      return map
    }, {} as InterfacesStatus)
  }

  async callProfileRead(target: string) {
    const message = {
      descriptor: {
        method: 'ProfileRead',
      },
    }

    const data = await this.pushMessage(target, [message])

    const encodedData = data.replies[0]?.entries[0]?.data
    if (!encodedData) {
      return undefined
    }

    const profileData = JSON.parse(decodeURIComponent(escape(window.atob(encodedData))))
    return profileData
  }

  async callProfileWrite(target: string, profileData: any) {
    const descriptor = {
      method: 'ProfileWrite',
    }
    const response = await this.uploadData(target, descriptor, profileData)
    console.info('Response >>> ', response)
    return response
  }

  async uploadData(target: string, descriptor: UploadMessageDescriptor, data: any) {
    const body = JSON.stringify({
      target,
      descriptor,
      data,
    })

    const url = `${this.url}/upload`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    return response.json()
  }

  async pushMessage(target: string, descriptors: any[]): Promise<any> {
    const message = {
      target,
      requestId: uuidv4(),
      messages: descriptors,
    }
    const body = JSON.stringify(message)

    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    return response.json()
  }
}

interface UploadMessageDescriptor {
  method: string
  schema?: string
  objectId?: string
  cid?: string
  clock?: number
  dataFormat?: string
}

export const identityHubClient = new IdentityHubClient()
