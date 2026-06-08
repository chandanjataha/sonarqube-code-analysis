environment = "develop"
location    = "East US 2"
project     = "robo"

common_tags = {
  Environment = "develop"
  Project     = "robo"
  ManagedBy   = "Terraform"
  CreatedDate = "2026-06-06"
}

# Resource Groups - one for compute
resource_groups = {
  compute = {
    name     = "rg-develop"
    location = "East US 2"
  }
}

# Container Registry
container_registries = {
  acr = {
    name          = "robodevelopacr"
    location      = "East US 2"
    resource_group_name = "rg-develop"
    sku           = "Premium"
    admin_enabled = false
  }
}

# AKS Clusters
kubernetes_clusters = {
  primary = {
    name                = "aks-dev-robo"
    location            = "East US 2"
    resource_group_name = "rg-develop"
    dns_prefix          = "aks-dev-robos"
    kubernetes_version  = "1.34.4"
    default_node_pool = {
      name            = "default"
      node_count      = 1
      vm_size         = "Standard_D2s_v3"
      os_disk_size_gb = 128
    }
  }
}



