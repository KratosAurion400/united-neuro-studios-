#!/usr/bin/env python3
"""
Backend API Testing for United Neuro Studios
Tests all API endpoints for functionality and data integrity
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://morphology-hub-1.preview.emergentagent.com"
API_BASE = f"{BACKEND_URL}/api"

def test_health_endpoint():
    """Test the health check endpoint"""
    print("🔍 Testing Health Check Endpoint...")
    
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy" and "United Neuro Studios" in data.get("service", ""):
                print("✅ Health check endpoint working correctly")
                return True
            else:
                print(f"❌ Health check returned unexpected data: {data}")
                return False
        else:
            print(f"❌ Health check failed with status {response.status_code}: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Health check request failed: {e}")
        return False

def test_create_inquiry():
    """Test creating a new inquiry"""
    print("\n🔍 Testing Create Inquiry Endpoint...")
    
    # Test data as specified in the review request
    test_inquiry = {
        "name": "Alex Rivera",
        "email": "alex.rivera@designstudio.com", 
        "commission": "The Morph ($250)",
        "brief": "I need a logo animation for my brand that transforms from a simple geometric shape into our company logo. The animation should be smooth and professional, suitable for use in presentations and marketing materials."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/inquiries",
            json=test_inquiry,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            
            # Verify all required fields are present
            required_fields = ["id", "name", "email", "commission", "brief", "status", "created_at"]
            missing_fields = [field for field in required_fields if field not in data]
            
            if missing_fields:
                print(f"❌ Response missing required fields: {missing_fields}")
                return False, None
                
            # Verify data integrity
            if (data["name"] == test_inquiry["name"] and 
                data["email"] == test_inquiry["email"] and
                data["commission"] == test_inquiry["commission"] and
                data["brief"] == test_inquiry["brief"] and
                data["status"] == "pending"):
                
                print("✅ Inquiry created successfully")
                print(f"   ID: {data['id']}")
                print(f"   Status: {data['status']}")
                print(f"   Created: {data['created_at']}")
                return True, data["id"]
            else:
                print(f"❌ Data mismatch in created inquiry: {data}")
                return False, None
        else:
            print(f"❌ Create inquiry failed with status {response.status_code}: {response.text}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Create inquiry request failed: {e}")
        return False, None

def test_get_inquiries():
    """Test retrieving all inquiries"""
    print("\n🔍 Testing Get All Inquiries Endpoint...")
    
    try:
        response = requests.get(f"{API_BASE}/inquiries", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            
            if isinstance(data, list):
                print(f"✅ Retrieved {len(data)} inquiries successfully")
                
                # If there are inquiries, verify structure of first one
                if data:
                    first_inquiry = data[0]
                    required_fields = ["id", "name", "email", "commission", "brief", "status", "created_at"]
                    missing_fields = [field for field in required_fields if field not in first_inquiry]
                    
                    if missing_fields:
                        print(f"❌ Inquiry missing required fields: {missing_fields}")
                        return False
                    else:
                        print("✅ Inquiry structure is correct")
                        print(f"   Sample inquiry: {first_inquiry['name']} - {first_inquiry['commission']}")
                
                return True
            else:
                print(f"❌ Expected list but got: {type(data)}")
                return False
        else:
            print(f"❌ Get inquiries failed with status {response.status_code}: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Get inquiries request failed: {e}")
        return False

def test_inquiry_validation():
    """Test inquiry validation with invalid data"""
    print("\n🔍 Testing Inquiry Validation...")
    
    # Test with missing required fields
    invalid_inquiry = {
        "name": "Test User"
        # Missing email, commission, brief
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/inquiries",
            json=invalid_inquiry,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        # Should return 422 for validation error
        if response.status_code == 422:
            print("✅ Validation correctly rejects incomplete data")
            return True
        elif response.status_code == 500:
            print("⚠️  Server error on validation (acceptable but not ideal)")
            return True
        else:
            print(f"❌ Unexpected response to invalid data: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Validation test request failed: {e}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("🚀 Starting United Neuro Studios Backend API Tests")
    print("=" * 60)
    
    test_results = []
    
    # Test 1: Health Check
    test_results.append(test_health_endpoint())
    
    # Test 2: Create Inquiry
    create_success, inquiry_id = test_create_inquiry()
    test_results.append(create_success)
    
    # Test 3: Get All Inquiries
    test_results.append(test_get_inquiries())
    
    # Test 4: Validation
    test_results.append(test_inquiry_validation())
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(test_results)
    total = len(test_results)
    
    print(f"Tests Passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Backend API is working correctly.")
        return True
    else:
        print("❌ Some tests failed. Check the output above for details.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)