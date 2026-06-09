# SonarQube Code Analysis

Modern end-to-end DevOps reference repository demonstrating Azure DevOps pipeline automation with SonarQube static code analysis, container image build and push, and Kubernetes deployment.

## Project Overview

This repository includes:
- A React + TypeScript + Vite frontend application under `app/`
- Azure DevOps CI/CD pipeline configuration in `azure-pipelines.yml`
- Terraform infrastructure definitions under `infra/` for Azure resource provisioning
- Kubernetes deployment manifests under `infra/kubernetes/`

The pipeline is designed to:
- install dependencies and build the frontend application
- execute SonarQube analysis and enforce quality gate status
- build and push a Docker image to Azure Container Registry (ACR)
- deploy the application to Azure Kubernetes Service (AKS)
- validate the deployed pods and service

## Features

- SonarQube static analysis integration
- Quality gate enforcement for code quality
- Docker container build and push to ACR
- AKS deployment using Kubernetes manifests
- Terraform modules for cloud infrastructure provisioning

## Folder Structure

- `app/` — React frontend source, build, lint, and deployment configuration
- `infra/envs/` — Terraform environment definitions for `develop`, `staging`, and `production`
- `infra/modules/` — reusable Terraform modules for Azure resources
- `infra/kubernetes/` — AKS deployment, service, and namespace manifests
- `azure-pipelines.yml` — Azure DevOps CI/CD pipeline definition

## Getting Started

### Prerequisites

- Node.js 20.x
- npm
- Docker
- Azure CLI (if using Azure infrastructure)
- Terraform (for infrastructure provisioning)
- Access to a SonarQube service
- Azure DevOps service connections for ACR and AKS

### Running Locally

1. Open a terminal inside the repository.
2. Change into the application folder:

```bash
cd app
```

3. Install dependencies:

```bash
npm ci
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local app in your browser at the address shown by Vite.

### Build for Production

```bash
cd app
npm run build
```

### Lint the Source

```bash
cd app
npm run lint
```

## Azure DevOps Pipeline

The `azure-pipelines.yml` pipeline performs the following stages:

1. **Build**
   - Install Node.js
   - Install npm dependencies
   - Prepare SonarQube analysis
   - Build the React application
   - Execute SonarQube analysis and publish the quality gate result
2. **Docker**
   - Build and push the application image to Azure Container Registry
3. **Deploy**
   - Apply Kubernetes manifests to AKS
   - Verify pods and services in the target namespace

## Infrastructure

Terraform files are organized by environment in `infra/envs/` and modular definitions in `infra/modules/`. The repository includes modules for:

- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- DNS
- Identity and managed identity
- Ingress NGINX
- Key Vault
- Log Analytics
- Networking
- Public IP
- Resource groups

## Notes

- The frontend application is configured using Vite, React, TypeScript, ESLint, Tailwind CSS, and related tooling.
- The Docker image name and SonarQube project key are defined in `azure-pipelines.yml`.
- Update service connection names and region-specific values before deploying to your Azure subscription.

## License

This repository is provided under the terms of the existing license file.
