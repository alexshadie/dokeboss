import { getDoku, getByteHash, removeGenerated, getPath } from '../globals';
import fs from 'fs';

const path = getPath('/sitePreview/');
describe('site preview', () => {

    beforeAll(async () => {

        await removeGenerated(path);

    });

    it('preview of html page by url to jpeg', async () => {
        const r = parseInt("" + (Math.random() * 1000));
        const outputFile = path + 'generated' + r + '.jpg';
        let data = Buffer.from('');

        try {
            data = await getDoku().from("https://github.com")
                .to(outputFile, { width: 300 })
                .preview()
        } catch (e) {
            console.log('error', e)
        }

        //hash = await getByteHash(data);
        //expect(hash).toEqual(resultHash);

        const stat = fs.lstatSync(outputFile);
        expect(stat.size).toBeGreaterThan(15000);
        //expect(stat.size).toEqual(185477);//im not sure if this is the correct parameter to check
        expect(stat.isFile()).toEqual(true);

    }, 25000);

});