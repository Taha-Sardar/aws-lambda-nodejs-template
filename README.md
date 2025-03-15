# Node.js Lambda Template with PostgreSQL Connection

This is a template for an AWS Lambda function written in Node.js that connects to a PostgreSQL database through AWS RDS Proxy.

## Features

- AWS Lambda function with API Gateway trigger
- PostgreSQL database connection through RDS Proxy
- Serverless Framework deployment configuration
- Environment variables management
- AWS Secrets Manager integration
- VPC configuration

## Prerequisites

- Node.js installed (v18.x recommended)
- AWS CLI configured with appropriate credentials
- Serverless Framework installed (`npm install -g serverless`)
- PostgreSQL database and RDS Proxy set up in AWS

## Setup Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd node-template-lambda
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_PROXY_ENDPOINT=your-rds-proxy-endpoint
   DB_PORT=5432
   DB_NAME=your-database-name
   DB_USERNAME=your-database-username
   DB_PASSWORD=your-database-password
   SECURITY_GROUP_ID=sg-xxxxxxxx
   SUBNET_ID_1=subnet-xxxxxxxx
   SUBNET_ID_2=subnet-xxxxxxxx
   SUBNET_ID_3=subnet-xxxxxxxx
   TEST_ENV=development
   ```

4. Configure VPC Settings:
   - Ensure your Lambda has access to your VPC by configuring the security groups and subnet IDs in the `.env` file
   - The security group should allow outbound traffic to your RDS Proxy
   - Subnets should be private subnets with NAT Gateway access

5. Configure AWS Secrets Manager:
   - The template automatically creates a Secrets Manager secret during deployment
   - The secret name will be `node-template-lambda-{stage}-secrets`
   - Values will be populated from your environment variables

## Deployment Steps

1. Deploy to development environment:
   ```bash
   serverless deploy --stage dev
   ```

2. Deploy to production environment:
   ```bash
   serverless deploy --stage prod
   ```

3. Deploy to a specific region:
   ```bash
   serverless deploy --stage prod --region us-east-1
   ```

## Testing

1. Test the function locally:
   ```bash
   serverless invoke local --function main
   ```

2. Test the deployed function:
   ```bash
   serverless invoke --function main --stage dev
   ```

## Removal

To remove all deployed resources:
1. Remove from development environment:
   ```bash
   serverless remove --stage dev
   ```

2. Remove from production environment:
   ```bash
   serverless remove --stage prod
   ```

3. Remove from a specific region:
   ```bash
   serverless remove --stage prod --region us-east-1
   ```

Note: This will remove all AWS resources created by this service, including:
- Lambda functions
- API Gateway endpoints
- IAM roles and policies
- Secrets Manager secrets
- CloudWatch log groups

