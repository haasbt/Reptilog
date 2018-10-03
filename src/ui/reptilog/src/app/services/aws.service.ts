import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class AwsService {

  constructor() { }

  uploadToAWS(petId: number, file: any) {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIW7NCOCKLWMUECUA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'reptilog-images',
      Key: 'images/' + petId + '/' + file.name,
      Body: file
    };

    bucket.upload(params, function (err) {
      if (err) {
        alert(err)
      }
    });
  }

  deleteFromAWS(petId: number, fileName: string) {
    const bucket = new S3(
      {
        accessKeyId: 'AKIAIW7NCOCKLWMUECUA',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'reptilog-images',
      Key: 'images/' + petId + '/' + fileName
    };

    bucket.deleteObject(params, function (err) {
      if (err) {
        alert(err)
      }
    });
  }

}
