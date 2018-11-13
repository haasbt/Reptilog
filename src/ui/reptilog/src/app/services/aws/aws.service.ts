import {Injectable} from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import {ManagedUpload} from "aws-sdk/lib/s3/managed_upload";
import {PromiseResult} from "aws-sdk/lib/request";
import {AWSError} from "aws-sdk";

@Injectable()
export class AwsService {

  constructor() {
  }

  uploadToAWS(petId: number, file: any): Promise<ManagedUpload.SendData> {
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

    return bucket.upload(params).promise();
  }

  deleteFromAWS(petId: number, fileName: string): Promise<PromiseResult<S3.Types.DeleteObjectOutput, AWSError>> {
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

    return bucket.deleteObject(params).promise();

  }
}
