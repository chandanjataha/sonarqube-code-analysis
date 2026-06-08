terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.70.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rgchandan"
    storage_account_name = "2state"
    container_name       = "tfstate"
    key                  = "dev.tfstate"
  }
}

provider "azurerm" {
  features {}
  subscription_id = "9441bbd5-0154-42cc-a0bb-d6c94e0f0b3b"
}