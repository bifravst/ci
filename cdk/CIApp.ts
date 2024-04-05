import { App } from 'aws-cdk-lib'
import { CIStack } from './CIStack.js'

export class CIApp extends App {
	public constructor(
		name: string,
		args: ConstructorParameters<typeof CIStack>[2],
	) {
		super()

		new CIStack(this, name, args)
	}
}
