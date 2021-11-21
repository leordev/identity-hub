import { v4 as uuidv4 } from 'uuid'

const DEFAULT_IDENTITY_HUB_URL = 'http://localhost:1337'

export interface InterfaceStatus {
  [key: string]: boolean
}

export class IdentityHubClient {
  private url: string

  constructor(url = DEFAULT_IDENTITY_HUB_URL) {
    this.url = url
  }

  async callFeatureDetectionRead(target: string): Promise<InterfaceStatus> {
    const message = {
      descriptor: {
        method: 'FeatureDetectionRead',
      },
    }

    const data = await this.pushMessage(target, [message])

    const { interfaces } = data.responses[0].entries
    return interfaces
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
