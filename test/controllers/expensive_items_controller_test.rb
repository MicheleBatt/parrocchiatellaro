require "test_helper"

class ExpensiveItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @expensive_item = expensive_items(:one)
  end

  test "should get index" do
    get expensive_items_url
    assert_response :success
  end

  test "should get new" do
    get new_expensive_item_url
    assert_response :success
  end

  test "should create expensive_item" do
    assert_difference("ExpensiveItem.count") do
      post expensive_items_url, params: { expensive_item: { description: @expensive_item.description } }
    end

    assert_redirected_to expensive_item_url(ExpensiveItem.last)
  end

  test "should show expensive_item" do
    get expensive_item_url(@expensive_item)
    assert_response :success
  end

  test "should get edit" do
    get edit_expensive_item_url(@expensive_item)
    assert_response :success
  end

  test "should update expensive_item" do
    patch expensive_item_url(@expensive_item), params: { expensive_item: { description: @expensive_item.description } }
    assert_redirected_to expensive_item_url(@expensive_item)
  end

  test "should destroy expensive_item" do
    assert_difference("ExpensiveItem.count", -1) do
      delete expensive_item_url(@expensive_item)
    end

    assert_redirected_to expensive_items_url
  end
end
