import fs from 'fs';
import { mockClient } from 'aws-sdk-client-mock';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { fetchBridgeRatings } from '../../src/utils/fetchBridgeRatings';

const s3ClientMock = mockClient(S3Client);

context("Browser AWS mock GetObjectCommand for fetchBridgeRatings ReadableStream", () => {
	let csvTestFileFixture;

	beforeEach(() => {
		s3ClientMock.reset();
		cy.fixture('csvTestFile.csv').then((f) => {
			csvTestFileFixture = f;
		})
	})

	it('cy.fixture() - load csvTestFile.csv as fixture', () => {
		expect(csvTestFileFixture, 'the same data').to.deep.equal(csvTestFileFixture);
	});

	it('s3ClientMock - mock S3 GetObjectCommand and verify returned payload result', async () => {
		const encoder = new TextEncoder();
		const view = encoder.encode(csvTestFileFixture);

		const inputStream = new ReadableStream({
			start(controller) {
				controller.enqueue(view);
				controller.close(); // don't forget to close the stream!
			},
		});

		s3ClientMock.on(GetObjectCommand).resolves({
			$metadata: {
				httpStatusCode: 200
			},
			Body: inputStream
		});

		const result = await fetchBridgeRatings();

		expect(result.result).to.include('Borough,Bridge,CurrentRating,VerbalRating,ReplacementCost');
	});
});
